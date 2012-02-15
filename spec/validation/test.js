/**
 * @fileoverview
 * @author czy88840616 <czy88840616@gmail.com>
 *
 */
var S = require('KISSY');

function Bird(name) { this.name = name; }
Bird.prototype.fly = function() { console.log(this.name + ' is flying now!'); };

function Chicken(name) {
    Chicken.superclass.constructor.call(this, name);
}
S.extend(Chicken, Bird,{
    fly:function(){
        Chicken.superclass.fly.call(this);
        console.log("it's my turn");
    }
});

new Chicken('kissy').fly();

//twice extend
function Cock(name) {
    Cock.superclass.constructor.call(this, name);
}

S.extend(Cock, Chicken,{
    fly:function(){
        Cock.superclass.fly.call(this);
        console.log("it's cock fly");
    }
});

new Cock('cock').fly();