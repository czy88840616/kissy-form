/**
 * @fileoverview
 * @author czy88840616 <czy88840616@gmail.com>
 *
 */
KISSY.add(function(S, Event) {

    var BaseRule = {

        validate:function () {
           return true;
        }
    };

    S.mix(BaseRule, S.EventTarget);

    return BaseRule;
}, {
    requires:[
        'event'
    ]
});