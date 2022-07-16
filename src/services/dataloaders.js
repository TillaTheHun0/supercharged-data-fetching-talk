
export const addDataloadersContext = (context) => {
  const newContext = {
    ...context
  }

  /**
   * * There is some sleight of hand happening here
   * * We pass the context object into createDataloaders()
   *
   * * We are adding a reference to dataloaders that we just created to that same object.
   * * Since Dataloaders access the context object lazily, they all now have a reference to each other
   * * which is why we pass the context to begin with :)
   */
  newContext.dataloaders = {}

  return newContext
}
