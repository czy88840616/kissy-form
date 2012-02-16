/**
 * @fileoverview
 * @author czy88840616 <czy88840616@gmail.com>
 *
 */
KISSY.add(function (S, Event, Base, RuleParser) {

    var Field = function () {
        var self = this;
        self.ruleParser = new RuleParser();

        Field.superclass.constructor.call(self);
    };

    S.extend(Field, Base, {
        validate:function () {
            var self = this;
            var res = self.ruleParser.validateAll();
            if (res) {
                self.fire('pass');
            } else {
                self.fire('fail')
            }
        },

        get:function (ruleName) {
            return this.ruleParser.get(ruleName);
        },

        validateOnce:function (ruleName) {
            var rule = this.ruleParser.get(ruleName);
            if (rule) {
                return rule.validate();
            }
        }
    });

    return Field;
}, {
    requires:[
        'event',
        'base',
        'form/validation/rule/ruleParser'
    ]
});