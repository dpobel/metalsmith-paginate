var paginate = require('../'),
    should   = require('should');

require('mocha');




describe('Paginate', function() {
    var metalsmith, metadata, files;


    beforeEach(function(done) {
        files = {
            'blog.md': {
                paginate: 'posts'
            }
        }

        metadata = {collections: {posts: []}};

        for (var i = 1; i <= 10; i++) {
            var name = 'content/posts/post-' + i + '.md';
            files[name] = {
                title: 'Post Number ' + i,
                collection: 'posts'
            };
            metadata.collections.posts.push(files[name]);
        }

        metalsmith = {
            metadata: function() {
                return metadata;
            }
        }

        done();
    });


    it('paginate a collection', function(done) {
        paginate({
            perPage: 2
        })(files, metalsmith, function() {
            var cPages = 0;
            for (var file in files) {
                if (/(blog)/.test(file)) {
                    cPages++;
                }
            }
            cPages.should.equal(5);
            done();
        });
    });


    it('create paths', function(done) {
        paginate({
            perPage: 2,
            path: ':collection/page'
        })(files, metalsmith, function() {
            var cPages = 0;
            for (var file in files) {
                if (/(posts\/page-[0-9]+)/.test(file)) {
                    cPages++;
                }
            }
            cPages.should.equal(4);
            done();
        });
    });


});
