KISSY.use('form/uploader/urlsInput', function (S, UrlsInput) {
    var $ = S.Node.all;
    $('body').append('<div id="J_UrlsInputWrapper"></div>');
    describe('UrlsInput', function () {
        var cUrlsInput,
        testUrl = 'http://img01.taobaocdn.com/tps/i1/T18OSLXcxkXXXXXXXX-440-135.jpg',
        testUrl2 = 'http://www.36ria.com/test.png',
        html = '<input type="hidden" value="" name="fileUrls" id="J_FileUrls" />';
        $(html).appendTo('body');
        it('�ɹ�ʵ����UrlsInput��������һ��input', function () {
            cUrlsInput = new UrlsInput('#J_UrlsInputWrapper', {name:"testInput"});
            cUrlsInput.render();
            expect(cUrlsInput.get('input').length).toEqual(1);
            expect($('#J_UrlsInputWrapper').children('input').length).toEqual(1);
        });
        it('�ɹ����url',function(){
            var $input = cUrlsInput.get('input');
            cUrlsInput.add(testUrl);
            expect($input.val()).toEqual(testUrl);
            expect(cUrlsInput.get('urls').length).toEqual(1);
        });
        it('���������ͬ·�����ظ����',function(){
            cUrlsInput.add(testUrl);
            expect(cUrlsInput.get('urls').length).toEqual(1);
        });
        it('�ı�·���ָ��',function(){
            var $input = cUrlsInput.get('input'),
                split = ':';
            cUrlsInput.set('split',split);
            cUrlsInput.add(testUrl2);
            expect(cUrlsInput.get('urls').length).toEqual(2);
            expect($input.val()).toEqual(testUrl + ':' + testUrl2);
        });
        it('�ɹ�ɾ��·��',function(){
            var $input = cUrlsInput.get('input');
            cUrlsInput.remove(testUrl);
            expect(cUrlsInput.get('urls').length).toEqual(1);
            expect($input.val()).toEqual(testUrl2);
        });
        it('�Ѿ�����input��ʵ�������',function(){
            var urlsInput = new UrlsInput(null,{name : 'fileUrls'});
            urlsInput.render();
            expect(urlsInput.get('input').length).toEqual(1);
        })
    });
});
