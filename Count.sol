// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

contract Count {
    
    uint public count;

    event increased(uint count);
    event decreased(uint count);

    function increaseCount() public {
        count+=1;
        emit increased(count);
    }

    function decreaseCount() public {
        require(count>0,"Count cannot be less than 0");
        count-=1;
        emit decreased(count);
    }
}
