## Avoiding Common Attacks

Below is list of the measures taken to avoid common attacks.

* The contracts supporting this DApp do not intentionally store a balance of Ether and have no functions to manage storage of Ether.  This by itself reduces exposure to attacks.

* There are two "payable" functions ```_sendDonation``` and ```mint```.  The function ```_sendDonation``` is being called inside the ```mint``` function and validated using  ```require``` modifier.
The  ```mint``` performs all state variable updates first and then performs the transfer of Ether the donation address last.

* Inputs to ```_sendDonation``` function are state variables and it uses ```call()``` function to send the Ether, however, the function visibility is set to ```private``` to prevent any interaction outside the contract.
It is also validated using ```require```.

* Using a specific pragma compile - Solidity 0.8.0 is used and not floating pragma.

* Implemented ```Ownable``` contract to restrict write access to update the donation address ```setDonationAddress``` only the owner of the contract can do so.