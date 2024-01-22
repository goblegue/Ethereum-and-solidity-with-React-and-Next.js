pragma solidity ^0.4.17;

contract Campaign{
    struct Request{
         string description;
         uint value;
         address recipient;
         bool completed;
         mapping (address => bool)  approvals;
         uint approvalcount;
    }

    address public manager;
    uint public min_contribution;
    mapping (address => bool) public approvers;
    uint public approverCount;
    Request[] public requests;

    modifier restricted()  {
        require(msg.sender == manager);
        _;
    }

    function Campaign(uint minimum , address creater) public {
        manager = creater;
        min_contribution = minimum;
    }

    function contribute() public payable {
         require(msg.value >= min_contribution);
         approvers[msg.sender] = true;
         approverCount++;
    }
    
    function createRequest(string description,uint value,address recipient)
        public restricted {
            require(value<(address(this).balance));
            Request memory newRequest  = Request({
                description : description,
                value : value,
                recipient : recipient,
                completed : false,
                approvalcount:  0
            });
            requests.push(newRequest);
    }
    function approveRequest(uint index) public{
        require(approvers[msg.sender]);
        Request storage  request = requests[index];
        require(!request.approvals[msg.sender]);
        request.approvals[msg.sender]= true;
        request.approvalcount++;
    }

    function finalizeRequest(uint index)public restricted{
        Request storage  request = requests[index];
        require(!request.completed);
        require(request.approvalcount>(approverCount/2));
        

        request.recipient.transfer(request.value);
        request.completed=true;

    }

}

contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(uint minimum) public {
        address newCampaign = new Campaign(minimum, msg.sender);
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (address[]) {
        return deployedCampaigns;
    }
}
