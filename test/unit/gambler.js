/* jshint expr:true */
/* global describe, it, before, beforeEach */

'use strict';

var expect    = require('chai').expect,
    Gambler    = require('../../app/models/gambler'),
    dbConnect = require('../../app/lib/mongodb'),
    cp        = require('child_process'),
    db        = 'gamblers';

describe('Gambler', function(){
  before(function(done){
    dbConnect(db, function(){
      done();
    });
  });

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      done();
    });
  });


 /* describe('constructor', function(){
    it('should create a new gambler object', function(){
      var p = new Person();
      expect(p).to.be.instanceof(Person);
    });
  });*/

  describe('.all', function(){
    it('should get all gamblers', function(done){
      Gambler.all(function(err, gamblers){
        expect(gamblers).to.have.length(3);
        done();
      });
    });
  });

  describe('.findById', function(){
    it('should find a gambler by the id', function(done){
      Gambler.findById('000000000000000000000001', function(gambler){
        console.log('GAMBLER', gambler);
        expect(gambler).to.be.instanceof(Gambler);
        expect(gambler.name).to.equal('Bob');
        done();
      });
    });
  });
  describe('#save', function(){
    it('should save a gambler to the database', function(done){
      Gambler.findById('000000000000000000000001', function(gambler){
        gambler.cash = 2000;
        gambler.assets = [];
        gambler.save(function(){
          expect(gambler.cash).to.equal(2000);
          expect(gambler.assets).to.have.length(0);
          done();
        });
      });
    });
  });

  describe('#removeAsset', function(){
    it('should find an asset and remove it', function(done){
      Gambler.findById('000000000000000000000001', function(gambler){
        gambler.removeAsset('ring');
        expect(gambler.cash).to.equal(6000);
        expect(gambler.assets).to.have.length(1);
        done();
      });
    });
  });
});

