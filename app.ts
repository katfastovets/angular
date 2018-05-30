class Student {
	marks:number[] = [];
	attendance:boolean[] = new Array(25);
	constructor(public name: string,
				public surname: string,
				public year: number) {
	}
	born():number {
		return new Date().getFullYear() - this.year;
	}
	marksAverage():number {
		let average = this.marks.reduce((sum, current) => sum + current);
		return Math.round(average / this.marks.length);
	}
	setAttendance(isPresent: boolean):string {
		if (this.attendance.length > 25) {
			return 'stack overflow';
		}
		for (var i = 0; i < this.attendance.length; i++) {
			if (this.attendance[i] === undefined) {
				this.attendance[i] = isPresent;
				return 'ok';
			}
		}
	}
	present():string {
		return this.setAttendance(true);
	}
	absent():string {
		return this.setAttendance(false);
	}
	attendAverage():number {
		return this.attendance.filter(item => item).length / this.attendance.length;
	}
	summary():string {
		if (this.marksAverage() > 90 && this.attendAverage() > 0.9) {
			return "Ути какой молодчинка!";
	   }
	   if (this.marksAverage() < 90 && this.attendAverage() < 0.9) {
		   return "Редиска!";
	   }
	   if (this.marksAverage() < 90 || this.attendAverage() < 0.9) {
			return "Норм, но можно лучше";
	   }
	}
}

//using methods
let kate = new Student('kate', 'fastovets', 1993);
kate.marks.push(100, 99, 90);
for (let i = 0; i < 25; i++) {
	kate.present();
}

let nastya = new Student('nastya', 'vasilieva', 1995);
nastya.marks.push(50, 75, 20);
for (let i = 0; i < 23; i++) {
	nastya.present();
}
nastya.absent();
nastya.absent();

let vasya = new Student('vasya', 'pupkin', 1990);
vasya.marks.push(90, 80, 45, 45, 90);

//create array of students
class Group<T> extends Array<T> {
	private constructor(items?: Array<T>) {
        super(...items)
    }
    static create<T>(): Group<T> {
        return Object.create(Group.prototype);
    }
 	average(methodName: string,
			surname: string) {
		if (surname) {
			let sortedGroup = this.slice();
			sortedGroup.sort(function(a, b) {
				if (a[methodName]() < b[methodName]()) {
					return 1;
				}
			});
			return sortedGroup.findIndex(item => item.surname === surname) + 1;
		} else {
			let sum = this.reduce((sum, item) => sum += item[methodName](), 0);
			return sum / this.length;	
		}
	}
	attendance(surname?: string) {
		return this.average('attendAverage', surname);
	}
	performance(surname?: string) {
		return this.average('marksAverage', surname);
	}
}
let group = Group.create();
group.push(kate, nastya, vasya);
console.log(group);
console.log(group.attendance('pupkin'));
console.log(group.performance());