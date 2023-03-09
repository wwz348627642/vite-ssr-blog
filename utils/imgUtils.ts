/**
 * 统一 图片 url前缀
 */
 export interface GetImageUrlOptions {
  width?: number;
  height?: number;
}


export const getImageUrl = (name?: string, options: GetImageUrlOptions = {}): string => {
  const prefix = 'http://cdn.wilsonwang.cn/';
  if (!name) {
    const defaultImageName = '';
    return prefix + defaultImageName;
  }

  const { width, height } = options; 
  const url = [prefix, name];
  
  if (width || height) {
    url.push('?imageView2/1')
  }

  if (width) {
    url.push(`/w/${width}`);
  }

  if (height) {
    url.push(`/h/${height}`);
  }

  return  url.join('');
}