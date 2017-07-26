import { pythonBridge } from 'python-bridge'

export class PythonFacenet {
  private python: any

  constructor() {
    //
  }

  public async init(): Promise<void> {
    this.python = pythonBridge({
      python: 'python3',
      env: {
        PYTHONPATH: `${__dirname}/../../python-facenet/src/`,
        TF_CPP_MIN_LOG_LEVEL: '2',  // suppress tensorflow warnings
      },
    })

    // we need not to care about session.close()(?)
    await this.python.ex`
      import tensorflow as tf

      session = tf.InteractiveSession()
    `
  }

  // public async prepare(): Promise<void> {
  // }

  public async test1() {
    return await this.python`1+1`
  }

  public async quit(): Promise<void> {
    await this.python.end()
    this.python = null
  }
}