type TNode = {
  title: string;
  zIndex: number;
  children: Array<TNode>;
}

/**
 * 处理标题 用于快速跳转
 * @param context { string } ;
 * @return Array<TNode>;
 */
export const resolveMarkDownTitle = (context?: string): TNode[] => {
  const arr: TNode[] = [];
  if (!context) return arr;
  const reg = /(#+)\s*[\S]+/g;
  let res = context.match(reg);
  let a = 0;
  res?.forEach((item, index) => {
    let obj = arr[a] || {} as TNode;
    const dataSourceArr = item.split(/\s+/);
    const sign = dataSourceArr[0];
    const text = dataSourceArr[1]?.trim()
    const zIndex = sign.length - 1;
    if (!text){
      return;
    }
    if (!obj.zIndex || obj.zIndex <= zIndex) {
      a = index;
      obj = {
        title: text,
        zIndex,
        children: [],
      }
      arr.push(obj);
    }
    
    if (obj.zIndex > zIndex) {
      a = index - 1;
      obj = arr[a];
      obj?.children.push({ 
        title: text,
        zIndex,
        children: [],
      })
    }
  })
  return arr;
};


