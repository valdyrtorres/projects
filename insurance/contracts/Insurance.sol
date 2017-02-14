pragma solidity ^0.4.2;

library Helper {

	enum Coverage { Basic, Intermediary, Full }
	enum Sinistro { Leve, Medio, Punk }

	function sinistroAsInt(Sinistro s) internal returns(uint8) {
		if (s == Sinistro.Leve)  return 0;
		if (s == Sinistro.Medio) return 1;
		if (s == Sinistro.Punk)  return 2;
		throw;
	}

	function sinistroAsStr(uint s) internal returns(string) {
		if (s == 0)  return "Low";
		if (s == 1) return "Medium";
		if (s == 2)  return "Full Loss";
		throw;
	}

	function coverageAsStr(Coverage c) internal returns(string) {
		if (c == Coverage.Basic)  return "Basic";
		if (c == Coverage.Intermediary) return "Intermediary";
		if (c == Coverage.Full)  return "Full";
		throw;
	}

	function coverage(uint c) internal returns(Coverage) {
		if (c == 0) return Coverage.Basic;
		if (c == 1) return Coverage.Intermediary;
		if (c == 2) return Coverage.Full;
		throw;
	}
}

contract Insurance {
	struct Car {
		string id;
		string model;
		uint year;
	}
	struct  Apolice {
		Helper.Coverage coverage;
		uint amount;
		Car car;
	}
  address insurer;
	mapping(address => Apolice) apolices;
	address[] beneficiaries;

	event NewBeneficiary(address beneficiary);
	event NewApoliceEvent(address beneficiary, string carModel, string carId, uint year, uint amount);
	event UpgradeApoliceEvent(address beneficiary, string coverage);

  modifier onlyInsurer() {
  		if (msg.sender != insurer) throw;
  		_;
  }

  function Insurance() {
    insurer = msg.sender;
  }

  function getStatus() constant returns(string) {
    return "Working!";
  }

	function addBeneficiary(address beneficiary) internal constant returns(bool) {
		for (uint i = 0; i < beneficiaries.length; i++) {
			if (beneficiaries[i] == beneficiary) {
				return false;
			}
		}
		beneficiaries.push(beneficiary);
		NewBeneficiary(beneficiary);
		return true;
	}

	function newApolice(
		address beneficiary,
		uint value,
		string carId,
		string carModel,
		uint carYear) onlyInsurer {
		apolices[beneficiary] = Apolice({
			coverage: Helper.Coverage.Basic,
			amount: value,
			car : Car({
				id: carId,
				model: carModel,
				year: carYear
				})});
		addBeneficiary(beneficiary);
		NewApoliceEvent(beneficiary, carModel, carId, carYear, value);
	}

	function upgrade(address beneficiary, uint coverageInt) {
		Apolice apolice = apolices[beneficiary];
		apolice.coverage = Helper.coverage(coverageInt);
		UpgradeApoliceEvent(beneficiary, Helper.coverageAsStr(apolice.coverage));
	}

	function getBeneficiaries() constant returns(address[]) {
		return beneficiaries;
	}

	function getApolice(address beneficiary) constant returns(
		string carModel, string carId, uint carYear, uint amount, string coverage) {
		Apolice apolice = apolices[beneficiary];
		carModel = apolice.car.model;
		carId = apolice.car.id;
		carYear = apolice.car.year;
		amount = apolice.amount;
		coverage = Helper.coverageAsStr(apolice.coverage);
	}
}
