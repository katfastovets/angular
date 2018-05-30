var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Student = /** @class */ (function () {
    function Student(name, surname, year) {
        this.name = name;
        this.surname = surname;
        this.year = year;
        this.marks = [];
        this.attendance = new Array(25);
    }
    Student.prototype.born = function () {
        return new Date().getFullYear() - this.year;
    };
    Student.prototype.marksAverage = function () {
        var average = this.marks.reduce(function (sum, current) { return sum + current; });
        return Math.round(average / this.marks.length);
    };
    Student.prototype.setAttendance = function (isPresent) {
        if (this.attendance.length > 25) {
            return 'stack overflow';
        }
        for (var i = 0; i < this.attendance.length; i++) {
            if (this.attendance[i] === undefined) {
                this.attendance[i] = isPresent;
                return 'ok';
            }
        }
    };
    Student.prototype.present = function () {
        return this.setAttendance(true);
    };
    Student.prototype.absent = function () {
        return this.setAttendance(false);
    };
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
    return Student;
}());
//using methods
var kate = new Student('kate', 'fastovets', 1993);
kate.marks.push(100, 99, 90);
for (var i = 0; i < 25; i++) {
    kate.present();
}
var nastya = new Student('nastya', 'vasilieva', 1995);
nastya.marks.push(50, 75, 20);
for (var i = 0; i < 23; i++) {
    nastya.present();
}
nastya.absent();
nastya.absent();
var vasya = new Student('vasya', 'pupkin', 1990);
vasya.marks.push(90, 80, 45, 45, 90);
//create array of students
var Group = /** @class */ (function (_super) {
    __extends(Group, _super);
    function Group(items) {
        return _super.apply(this, items) || this;
    }
    Group.create = function () {
        return Object.create(Group.prototype);
    };
    Group.prototype.average = function (methodName, surname) {
        if (surname) {
            var sortedGroup = this.slice();
            sortedGroup.sort(function (a, b) {
                if (a[methodName]() < b[methodName]()) {
                    return 1;
                }
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
    return Group;
}(Array));
var group = Group.create();
group.push(kate, nastya, vasya);
console.log(group);
console.log(group.attendance('pupkin'));
console.log(group.performance());
