import * as path from 'path';

export const imageExtension = ['.jpeg', '.jpg', '.png', '.bmp'];

export function checkFileExtension(file: Express.Multer.File, extend: Array<string>) {
      const acceptTypes = [...extend];
      const fileType = path.extname(file.originalname).toLocaleLowerCase();

      return acceptTypes.includes(fileType);
}

export function checkFileSize(file: Express.Multer.File, limit: number) {
      const limitSize = limit * 1024 * 1024;
      return file.size < limitSize;
}
