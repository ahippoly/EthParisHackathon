/* FILE UPLOAD */

class FilesUtils {
  static getFileExtension(file: string): string | null {
    const fileData = /.*\.(\w+)/g.exec(file.toLowerCase())
    if (!fileData || !fileData[1]) return null

    return fileData[1]
  }

  static isVideo(file: string): boolean {
    const extension = FilesUtils.getFileExtension(file)
    return (extension && ['mp4', 'ogg'].includes(extension)) as boolean
  }

  static isImage(file: string): boolean {
    const extension = FilesUtils.getFileExtension(file)
    return (extension && ['jpeg', 'jpg', 'png'].includes(extension)) as boolean
  }

  static getFileAsBase64(file: File): Promise<string | null> {
    return new Promise((resolve) => {
      const reader = new FileReader()

      reader.addEventListener('loadend', () => {
        const base64result = reader.result

        if (base64result && typeof base64result === 'string') {
          resolve(base64result)
        } else {
          resolve(null)
        }
      })

      if (file) {
        reader.readAsDataURL(file)
      } else {
        resolve(null)
      }
    })
  }
}

export default FilesUtils
