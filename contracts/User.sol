pragma solidity ^0.5.0;

contract User {

    struct user{
	    uint256 id;
	    bytes32 name;
	    bytes32 username;
	    bytes32 email;
	    bytes32 mobile;
	    bytes32 password;
	    bytes32 confirm;
	    uint256 typ;
	    bytes32 adr;
	    bytes32 city;
	    bytes32 state;
        
    }
   
	mapping(uint256 => user) m_user;
    user[] public um;
	
	function newUser (uint256 _id,bytes32 _name ,bytes32 _username,
	    bytes32 _email,
	    bytes32 _mobile,
	    bytes32 _password,
	    bytes32 _confirm,
	    uint256 _typ,
	    bytes32 _adr,
	    bytes32 _city,
	    bytes32 _state ) public {
        User.user memory usernew = user(_id,_name,_username,_email,_mobile,_password,_confirm,_typ,_adr,_city,_state);
        m_user[_id] = usernew;
        um.push(usernew);
    }
	
	function getUser(uint256 id) view public returns(uint256,bytes32, bytes32) {
        return (m_user[id].id,m_user[id].name,m_user[id].username);
    }
}
