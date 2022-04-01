class Semester {
  startDate: Date;
  endDate: Date;
  index: number;

  constructor(startDate: Date, endDate: Date, index: number) {
    this.startDate = startDate;
    this.endDate = endDate;
    this.index = index;
  }

  isCurrentSemester() {
    const currentTime = new Date().getTime();
    return this.startDate.getTime() <= currentTime && currentTime <= this.endDate.getTime();
  }
}

export default Semester;
