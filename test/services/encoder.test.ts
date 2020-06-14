import { Sha1Express } from './../../src/encoders/Sha1Express';
import bigInt = require('big-integer');
const toBytes = require('to-byte-array');
const btoa = require('btoa');
const atob = require('atob');
import crypto = require('crypto-js');
import * as assert from 'assert';
import { EncoderService } from './../../src/services/EncoderService';
import { Base8 } from '../../src/encoders/Base8';
import { Base16 } from './../../src/encoders/Base16';
import { Base32 } from '../../src/encoders/Base32';
import { Base36 } from '../../src/encoders/Base36';
import { Base64 } from '../../src/encoders/Base64';
import { BufferHex } from '../../src/encoders/BufferHex';
import { BaseEncoder } from '../../src/encoders/BaseEncoder';
import { E_EMPTY_INPUT } from '../../src/util/errors';

describe('Encoder unit tests', async () => {

  let base8: BaseEncoder;
  let base14: BaseEncoder;
  let base16: BaseEncoder;
  let base24: BaseEncoder;
  let base28: BaseEncoder;
  let base32: BaseEncoder;
  let base36: BaseEncoder;
  let base64: BaseEncoder;
  let bufferHex: BaseEncoder;
  let instance: EncoderService;
  let sha1Express: Sha1Express;

  beforeEach(async function () {
    // tslint:disable-next-line: no-invalid-this
    this.timeout(1000000000);
    base8 = new Base8();
    base16 = new Base16();
    base32 = new Base32();
    base36 = new Base36();
    base64 = new Base64();
    bufferHex = new BufferHex();
  });

  it('should throw error if input is empty', () => {
    instance = new EncoderService(base16);
    try {
      instance.decode('');
    } catch (e) {
      assert.strictEqual(e.message, E_EMPTY_INPUT);
    }
  });

  it('short number base8 decoding test', () => {
    instance = new EncoderService(base8);

    const str = '31646541';
    const expected = [103, 77, 97];
    const result = instance.decode(str);

    assert.deepStrictEqual(result, expected);
  });

  it('short number base8 encoding test', () => {
    instance = new EncoderService(base8);

    const expected = '31646541';
    const arr = [103, 77, 97];
    const result = instance.encode(arr);

    assert.deepStrictEqual(result, expected);
  });

  it('short number base16 decoding test', () => {
    instance = new EncoderService(base16);

    const str = '98b2f23d';
    const expected = [152, 178, 242, 61];
    const result = instance.decode(str);


    assert.deepStrictEqual(result, expected);
  });

  it('short number base16 encoding test', () => {
    instance = new EncoderService(base16);

    const expected = '98b2f23d';
    const arr = [152, 178, 242, 61];
    const result = instance.encode(arr);

    assert.deepStrictEqual(result, expected);
  });

  it('short number base32 decoding test', () => {
    instance = new EncoderService(base32);

    const str = '31646541';
    const expected = [24, 76, 67, 20, 129];
    const result = instance.decode(str);

    assert.deepStrictEqual(result, expected);
  });

  it('short number base32 encoding test', () => {
    instance = new EncoderService(base32);

    const expected = '31646541';
    const arr = [24, 76, 67, 20, 129];
    const result = instance.encode(arr);

    assert.deepStrictEqual(result, expected);
  });

  it('short number base64 decoding test', () => {
    instance = new EncoderService(base64);

    const str = 'Njc3MDAxNw==';
    const expected = [103, 77, 97];
    const result = instance.decode(str);

    assert.deepStrictEqual(result, expected);
  });

  it('short number base64 encoding test', () => {
    instance = new EncoderService(base64);

    const expected = 'Njc3MDAxNw==';
    const arr = [103, 77, 97];
    const result = instance.encode(arr);

    assert.deepStrictEqual(result, expected);
  });

  it('short number sha1 decoding test', () => {

    sha1Express = new Sha1Express(36, 10);

    const code = '123456789';
    const sha1 = crypto.SHA1(code).toString();

    console.log('sha1 = ', sha1);

    const expected = ['dkuxym4g', '7s7mfxsv', '5oequitf', '478vh269'];

    const dec = sha1Express.decode(sha1);

    console.log('dec = ', dec);

    assert.deepEqual(dec, expected);

    const enc = sha1Express.encode(dec);

    assert.equal(enc === sha1, true);

  });



  it('long number base8 decoding test', async () => {

    sha1Express = new Sha1Express(36, 10);

    const code = '116311474231113516702134342400414143206126403671660545535070012425145143'
      + '3665154621070427104557201067171276700627170465777043334607301704736021762'
      + '6325467150763006577133541526554667660414027165423126701315057614760526500'
      + '0452421616177052165224543311447543654741617367042213645643631333465753306'
      + '2163564254163664432653550166600433332675642447003252221104064117622317044'
      + '717471253';

    const sha1 = crypto.SHA1(code).toString();

    const expected = ['a94o79nr', '6gfqrvjx', 'cu7y1kbd', '10oxamnx'];

    const dec = sha1Express.decode(sha1);

    assert.deepStrictEqual(dec, expected);

    const enc = sha1Express.encode(dec);

    assert.equal(enc === sha1, true);


  });


});