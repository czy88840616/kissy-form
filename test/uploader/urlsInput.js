KISSY.use('form/uploader/urlsInput', function (S, UrlsInput) {
    var $ = S.Node.all;
    $('body').append('<div id="J_UrlsInputWrapper"></div>');
    describe('UrlsInput', function () {
        var cUrlsInput;
        html = '<input type="hidden" value="" name="fileUrls" id="J_FileUrls" />';
        $(html).appendTo('body');
        it('�ɹ�ʵ����UrlsInput��������һ��input', function () {
            cUrlsInput = new UrlsInput('#J_UrlsInputWrapper', {name:"testInput"});
            cUrlsInput.render();
            expect(cUrlsInput.get('input').length).toEqual(1);
            expect($('#J_UrlsInputWrapper').children('input').length).toEqual(1);
        });
        it('�ɹ����һ��url',function(){
            cUrlsInput.add(0);
        })
    });
});
