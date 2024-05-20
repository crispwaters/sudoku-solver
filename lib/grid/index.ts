function* index() {
  for (let y=0; y<9; y++) {
    for (let x=0; x<9; x++) {
      yield {x, y}
    }
  }
}

/**
 * Sudoku Grid
 */
export class Grid {
  static serialize(board: string[][]): string {
    let serialized = ''
    for (const {x, y} of index()) {
      serialized += board[y][x]
    }
    return serialized
  }
  static deserialize(input: string): string[][] {
    const deserialized = []
    let row: string[] = []
    for (const {x, y} of index()) {
      if (x === 0) {
        row = []
        deserialized.push(row)
      }
      row.push(input[x + (9*y)])
    }
    return deserialized
  }

  serialized: string
  constructor(boardState: string) {
    this.serialized = boardState
  }
  
  private _deserialized: string[][] | undefined
  public get deserialized() {
    if (!this._deserialized) {
      this._deserialized = Grid.deserialize(this.serialized)
    }
    return this._deserialized
  }

  private _wave: { row: number, column: number, values: string[] }[] | undefined
  public get wave() {
    if (!this._wave) {
      
    }
    return this._wave
  }

  public getRow(row: number): string[] {
    return this.deserialized[row]
  }
  
  public getColumn(column: number): string[] {
    return this.deserialized.map(row => row[column])
  }

  /**
   * Gets the sector by index
   * - 0 1 2
   * - 3 4 5
   * - 6 7 8
   * @param sector 
   */
  public getSector(sector: number): string[] {
    const row = Math.floor(sector / 3) * 3
    const column = (sector % 3) * 3

    const cells = []
    for (let r=row; r<row+3; r++) {
      for (let c=column; c<column+3; c++) {
        cells.push(this.deserialized[r][c])
      }
    }
    return cells
  }
  
}