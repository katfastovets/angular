class Student {
	name:string;
	surname:string;
	year:number;
	marks;
	attendance;

	function setAttendance(isPresent) {
		if (this.attendance.length > 25) {
			return 'stack overflow';
		}
		// цикл здесь потому, что с форычом item равен undefined
		for (let i = 0; i < this.attendance.length; i++) {
			if (this.attendance[i] === undefined) {
				this.attendance[i] = isPresent;
				return 'ok';
			}
		}
	}	
	constructor(name:string, surname:string, year:number) {
		this.name = name;
		this.surname = surname;
		this.year = year;
		this.marks = [];
		this.attendance = [];
		this.attendance.length = 25;
	}
	born() {
		return new Date().getFullYear() - this.year;
	}
	marksAverage() {
		let average = this.marks.reduce(function(sum, current) {
			return sum + current;
		});
		return Math.round(average / this.marks.length);
	}
}
function setAttendance(isPresent) {
	if (this.attendance.length > 25) {
		return 'stack overflow';
	}
	// цикл здесь потому, что с форычом item равен undefined
	for (let i = 0; i < this.attendance.length; i++) {
		if (this.attendance[i] === undefined) {
			this.attendance[i] = isPresent;
			return 'ok';
		}
	}
}
Student.prototype.present = setAttendance;
Student.prototype.absent = setAttendance;
Student.prototype.attendAverage = function() {
	return this.attendance.filter(item => item).length / this.attendance.length; 
}
Student.prototype.summary = function() {
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
let kate = new Student('kate', 'fastovets', 1993);
kate.marks.push(100, 99, 90);
for (let i = 0; i < 25; i++) {
	kate.present(true);
}

let nastya = new Student('nastya', 'vasilieva', 1995);
nastya.marks.push(50, 75, 20);
for (let i = 0; i < 23; i++) {
	nastya.present(false);
}
nastya.absent(true);
nastya.absent(true);

let vasya = new Student('vasya', 'pupkin', 1990);
vasya.marks.push(90, 80, 45, 45, 90);
for (let i = 0; i < 20; i++) {
	vasya.present(true);
}
for (let i = 0; i < 5; i++) {
	vasya.present(false);
}

function Group() {}
Group.prototype = [];
Group.prototype.average = function(methodName, surname) {
	if (surname) {
		let sortedGroup = this.slice();
		sortedGroup.sort(function(a, b) {
			if (a[methodName]() < b[methodName]()) return 1;
		})
		return sortedGroup.findIndex(item => item.surname === surname) + 1;
	} else {
		let sum = this.reduce((sum, item) => sum += item[methodName](), 0);
		return sum / this.length;	
	}
}
Group.prototype.attendance = function(surname) {
	return this.average('attendAverage', surname);
}
Group.prototype.performance = function(surname) {
	return this.average('marksAverage', surname);
}
let group = new Group();
group.push(kate, nastya, vasya);
console.log(group);
console.log(group.attendance('pupkin'));
console.log(group.performance());