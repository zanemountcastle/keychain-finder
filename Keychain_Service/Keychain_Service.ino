#include <CurieBLE.h>

BLEPeripheral blePeripheral;
BLEService keychainService = BLEService("FFF1"); // Not a reserved ervice number 

// No services to define since only RSSI is used
// Future improvements could include services to play sound, flash a light, etc

void setup() {
  Serial.begin(9600);

  blePeripheral.setLocalName("Zane's Keychain");
  blePeripheral.setDeviceName("Zane's Keychain");
  blePeripheral.setAdvertisedServiceUuid(keychainService.uuid());

  blePeripheral.addAttribute(keychainService);

  blePeripheral.begin(); // Start Bluetooth advertising

  while (! Serial); // Busy wait until serial ready
  Serial.println(F("Bluetooth Keychain Ready!\n"));
}

void loop() {
  blePeripheral.poll(); // Continuously advertise
}

