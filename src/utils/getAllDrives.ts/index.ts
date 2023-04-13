import process from "child_process";

// cmd
const cmdOrder = {
  getAllDrive: () => "wmic logicaldisk where drivetype=3 get deviceid",
  getOneDriveName: (drive: string) =>
    `wmic logicaldisk where name="${drive}:" get volumename`,
};

/**
 * Get all drives from PC
 * @returns All drives and their names from PC
 */
export default async function getAllDrive(): Promise<string[]> {
  let result: string[] = [];
  const promise = new Promise((resolve, reject) => {
    // get all drives
    process.exec(cmdOrder.getAllDrive(), (error: any, stdout: any) => {
      if (error !== null) {
        console.error(error);
        return;
      }
      console.log("stdout", stdout);
      //@ts-ignore
      const stdoutArr = [...stdout];
      console.log("stdoutArr", stdoutArr);
      let res: string[] = [];
      stdoutArr.forEach((v: string, i: number) => {
        if (v === ":") {
          res.push(stdoutArr[i - 1]);
        }
      });
      const resList: {
        drive: string;
        name: string;
      }[] = [];
      const promiseArr: Promise<any>[] = [];
      // get drives' names
      res.forEach((v: string) => {
        promiseArr.push(
          new Promise((resolve, reject) => {
            process.exec(
              cmdOrder.getOneDriveName(v),
              (error: any, stdout: any) => {
                if (error !== null) {
                  console.error(error);
                  return;
                }
                const stdoutArr = [...stdout];
                const res: string[] = [];
                stdoutArr.forEach((v: string, i: number) => {
                  if (v !== " " && v !== "\n" && v !== "\r") {
                    res.push(v);
                  }
                });
                res.splice(0, 10);
                resList.push({
                  drive: v,
                  name: res.join(""),
                });
                resolve(true);
              }
            );
          })
        );
      });
      Promise.all(promiseArr).then((res) => {
        resolve(resList);
      });
    });
  });
  await promise.then((res: any) => {
    result = res;
  });

  return result;
}
