import {Characteristic, Descriptor} from '@abandonware/bleno';

/**
 * Bluetooth LE GATT Heartrate Measurement Characteristic implementation.
 */
export class HeartrateMeasurementCharacteristic extends Characteristic {
  constructor() {
    super({
      uuid: '2a37',
      properties: ['notify'],
      descriptors: [
        new Descriptor({
          uuid: '2901',
          value: 'Heartrate Measurement'
        }),
        new Descriptor({
          uuid: '2903',
          value: Buffer.alloc(2)
        })
      ]
    })
  }

  /**
   * Notify subscriber (e.g. Zwift) of new Heartrate Measurement.
   * @param {object} measurement - new heartrate measurement.
   * @param {number} measurement.heartrate - current heartrate (bpm)
   */
  updateMeasurement({ heartrate }) {

    const value = Buffer.alloc(2);
    var hr = heartrate & 0xff;  // ensure hr is an 8-bit integer
    value.writeUInt8(hr, 1);

    // Set flags to indicate data only contains UINT8 Heart Rate
    value.writeUInt8(0x00, 0);

    if (this.updateValueCallback) {
      this.updateValueCallback(value)
    }
  }
}
