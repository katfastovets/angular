var Student = /** @class */ (function () {
    function Student(name, surname, year) {
        this.name = name;
        this.surname = surname;
        this.year = year;
        this.marks = [];
        this.attendance = [];
        this.attendance.length = 25;
    }
    Student.prototype.born = function () {
        return new Date().getFullYear() - this.year;
    };
    Student.prototype.marksAverage = function () {
        var average = this.marks.reduce(function (sum, current) {
            return sum + current;
        });
        return Math.round(average / this.marks.length);
    };
    return Student;
}());
function setAttendance(isPresent) {
    if (this.attendance.length > 25) {
        return 'stack overflow';
    }
    // цикл здесь потому, что с форычом item равен undefined
    for (var i = 0; i < this.attendance.length; i++) {
        if (this.attendance[i] === undefined) {
            this.attendance[i] = isPresent;
            return 'ok';
        }
    }
}
Student.prototype.present = setAttendance;
Student.prototype.absent = setAttendance;
Student.prototype.attendAverage = function () {
    return this.attendance.filter(function (item) { return item; }).length / this.attendance.length;
};
Student.prototype.summary = function () {
    if (this.marksAverage() > 90 && this.attendAverage() > 0.9) {
        return "Ути какой молодчинка!";
    }
    if (this.marksAverage() < 90 && this.attendAverage() < 0.9) {
        return "Редиска!";
    }
    if (this.marksAverage() < 90 || this.attendAverage() < 0.9) {
        return "Норм, но можно лучше";
    }
};
var kate = new Student('kate', 'fastovets', 1993);
kate.marks.push(100, 99, 90);
for (var i = 0; i < 25; i++) {
    kate.present(true);
}
var nastya = new Student('nastya', 'vasilieva', 1995);
nastya.marks.push(50, 75, 20);
for (var i = 0; i < 23; i++) {
    nastya.present(false);
}
nastya.absent(true);
nastya.absent(true);
var vasya = new Student('vasya', 'pupkin', 1990);
vasya.marks.push(90, 80, 45, 45, 90);
for (var i = 0; i < 20; i++) {
    vasya.present(true);
}
for (var i = 0; i < 5; i++) {
    vasya.present(false);
}
function Group() { }
Group.prototype = [];
Group.prototype.average = function (methodName, surname) {
    if (surname) {
        var sortedGroup = this.slice();
        sortedGroup.sort(function (a, b) {
            if (a[methodName]() < b[methodName]())
                return 1;
        });
        return sortedGroup.findIndex(function (item) { return item.surname === surname; }) + 1;
    }
    else {
        var sum = this.reduce(function (sum, item) { return sum += item[methodName](); }, 0);
        return sum / this.length;
    }
};
Group.prototype.attendance = function (surname) {
    return this.average('attendAverage', surname);
};
Group.prototype.performance = function (surname) {
    return this.average('marksAverage', surname);
};
var group = new Group();
group.push(kate, nastya, vasya);
console.log(group);
console.log(group.attendance('pupkin'));
console.log(group.performance());
