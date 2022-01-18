import {PrimaryService} from '@abandonware/bleno';
import {CyclingPowerMeasurementCharacteristic} from './characteristics/heartrate-measurement';

/**
 * Bluetooth LE GATT Heartrate Service implementation.
 */
export class HeartrateService extends PrimaryService {
  /**
   * Create a HeartrateService instance.
   */
  constructor() {
    super({
      uuid: '180D',
      characteristics: [
        new HeartrateMeasurementCharacteristic()
      ]
    })
  }

  /**
   * Notify subscriber (e.g. Zwift) of new Heartrate Measurement.
   * @param {object} measurement - new heartrate measurement.
   * @param {number} measurement.heartrate - current heartrate (bpm)
   */
  updateMeasurement(measurement) {
    this.characteristics[0].updateMeasurement(measurement)
  }
}
