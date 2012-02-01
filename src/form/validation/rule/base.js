/**
 * @fileoverview
 * @author czy88840616 <czy88840616@gmail.com>
 *
 */
KISSY.add(function(S, Event) {

    var BaseRule = function() {
        this.validate = function() {

        }
    };

    S.augment(BaseRule, S.EventTarget);

    return BaseRule;
}, {
    requires:[
        'event'
    ]
});