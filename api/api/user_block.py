from compile_solidity_utils import deploy_n_transact
from solc import link_code
import json
import os
    
# Solidity source code
module_dir = os.path.dirname(__file__)
print(module_dir)
print("hello")
contract_address, abi = deploy_n_transact(module_dir,['user.sol', 'stringUtils.sol'])
with open('data.json', 'w') as outfile:
    data = {
        "abi": abi,
        "contract_address": contract_address
    }
    json.dump(data, outfile, indent=4, sort_keys=True)
