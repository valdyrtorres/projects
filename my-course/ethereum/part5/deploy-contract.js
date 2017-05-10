var abiArray = web3.eth.contract([{"constant":true,"inputs":[],"name":"getValues","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_newValue","type":"uint256"}],"name":"setX","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getX","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"values","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newValue","type":"uint256"},{"indexed":false,"name":"oldValue","type":"uint256"}],"name":"NewValue","type":"event"}]);
var c = abiArray.new(
   {
     from: web3.eth.accounts[0],
     data: '0x6060604052341561000c57fe5b5b61002a601b610030640100000000026101aa176401000000009004565b5b610108565b600054811115156100415760006000fd5b7f819590290c469cddad917692c5362a123eaf16190bba714f10c649064fb1f31c81600054604051808381526020018281526020019250505060405180910390a1806000819055506001805480600101828161009d91906100b7565b916000526020600020900160005b83909190915055505b50565b8154818355818115116100de578183600052602060002091820191016100dd91906100e3565b5b505050565b61010591905b808211156101015760008160009055506001016100e9565b5090565b90565b6102f2806101176000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806319eb4a901461005c5780634018d9aa146100d15780635197c7aa146100f15780635e383d2114610117575bfe5b341561006457fe5b61006c61014b565b60405180806020018281038252838181518152602001915080519060200190602002808383600083146100be575b8051825260208311156100be5760208201915060208101905060208303925061009a565b5050509050019250505060405180910390f35b34156100d957fe5b6100ef60048080359060200190919050506101aa565b005b34156100f957fe5b610101610231565b6040518082815260200191505060405180910390f35b341561011f57fe5b610135600480803590602001909190505061023c565b6040518082815260200191505060405180910390f35b610153610261565b600180548060200260200160405190810160405280929190818152602001828054801561019f57602002820191906000526020600020905b81548152602001906001019080831161018b575b505050505090505b90565b600054811115156101bb5760006000fd5b7f819590290c469cddad917692c5362a123eaf16190bba714f10c649064fb1f31c81600054604051808381526020018281526020019250505060405180910390a180600081905550600180548060010182816102179190610275565b916000526020600020900160005b83909190915055505b50565b600060005490505b90565b60018181548110151561024b57fe5b906000526020600020900160005b915090505481565b602060405190810160405280600081525090565b81548183558181151161029c5781836000526020600020918201910161029b91906102a1565b5b505050565b6102c391905b808211156102bf5760008160009055506001016102a7565b5090565b905600a165627a7a723058205cbad8513123dd9177879dd23df5bcc0f49f8ef61ec4c1495674b7136553464f0029',
     gas: '4700000'
   }, function (e, contract){
    console.log(e, contract);
    if (typeof contract.address !== 'undefined') {
         console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
    }
 })
