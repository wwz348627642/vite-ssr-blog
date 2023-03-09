import { cloneDeep } from 'lodash';

export type ITreeData<T> = T & { children?: Array<T>, deep?: number };
type Options<T> = {
  idKey: keyof T;
  pidKey: keyof T;
  pidValue?: T[keyof T];
}
/**
 * 折叠list为树形结构
 * @param arr { Array<T> }  待处理的list
 * @param options { Options<T> } 配置参数
 * @return { Array<ITreeComment<T>> } 树形数据
 */
 export const resolveListToTree = <T extends Object>(arr?: Array<T>, options?: Options<T>): Array<ITreeData<T>> => {
  if (!Array.isArray(arr)) return [];
  if (!options) return [];
  const { idKey, pidKey, pidValue } = options;
  const list = cloneDeep(arr);

  type TMapper = {
    [key in string | number]?: ITreeData<T>;
  }
  const mapper: TMapper = {};
  const result: Array<ITreeData<T>> = [];

  list.forEach(item => {
    const itemData = item as ITreeData<T>
    const value: any = item[idKey];
    mapper[value] = itemData;
  });

  list.forEach((item) => {
    const itemData = item as ITreeData<T>
    const linkPid: any = item[pidKey];
    if (linkPid === pidValue || !linkPid) {
      itemData.deep = 0;
      result.push(itemData);
    }
    const parentItem = mapper[linkPid];
    if (parentItem) {
      itemData.deep = Number(parentItem.deep) + 1;
      parentItem.children = parentItem?.children || [];
      parentItem.children.push(itemData);
    }
  })

  return result;
 }