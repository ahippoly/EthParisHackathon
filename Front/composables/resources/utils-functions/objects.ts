/* OBJECTS */

class ObjectsUtils {
  static clone(object: object): object {
    return JSON.parse(JSON.stringify(object))
  }

  static getProperty(object: object, path: string): unknown {
    const pathSteps = path.split('.')
    let objectProperty: unknown = object

    for (let i = 0; i < pathSteps.length; i++) {
      objectProperty = (objectProperty as DynamicObject)[pathSteps[i]]
      if (!objectProperty) return null
    }

    return objectProperty
  }
}

export default ObjectsUtils
