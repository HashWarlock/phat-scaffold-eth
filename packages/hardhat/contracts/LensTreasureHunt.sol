// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.11;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./PhatRollupAnchor.sol";
import { ITokenERC721 } from "./interfaces/ITokenERC721.sol";

contract LensTreasureHunt is PhatRollupAnchor, Ownable {
    uint256 public digCost;
    mapping(uint => ITokenERC721) public lensTreasureHuntNfts;
    mapping(uint => string) private _lensTreasureHuntNftsURIs;
    mapping(uint => address) public requestsByUsers;
    address[5] public treasureRecipients;
    uint8 public lensTreasureHuntNftIdZerosLeft;
    uint256 public ownersCut;

    event ResponseReceived(uint reqId, string pair, uint256 value);
    event MintSucceeded(uint256 nftId);
    event SetLensTreasureHuntNftAddress(uint index, ITokenERC721 nftAddress);
    event NewDigRequest(uint reqId, string profileId);
    event NewTreasureRecipient(address recipient);
    event DigCostIncrease(uint256 _digCost);
    event TreasureRecipientsRewarded(uint256 split);
    event TreasureHuntOfficiallyEnded();
    event ErrorReceived(uint reqId, string pair, uint256 errno);
    event ErrorMintFail(string err);
    event ErrorMissingLensProfile(string err);

    uint constant TYPE_RESPONSE = 0;
    uint constant TYPE_ERROR = 2;

    mapping(uint => string) requests;
    uint nextRequest = 1;

    constructor(address phatAttestor, uint256  _digCost) {
        _grantRole(PhatRollupAnchor.ATTESTOR_ROLE, phatAttestor);
        digCost = _digCost;
        ownersCut = 0;
        lensTreasureHuntNfts[1] = ITokenERC721(0x7163fc5fdCd5474f026C9017a0f633992Da6b339);
        lensTreasureHuntNfts[2] = ITokenERC721(0x501eB5CDF76fb493ae0E60691c3c0C30E153F6fb);
        lensTreasureHuntNfts[3] = ITokenERC721(0x29Af1dEd078e72A061469185e66b2946AEFD837C);
        lensTreasureHuntNfts[4] = ITokenERC721(0x78e9344cfe3aAC2DDB3f4ce2B9d5cc80fc320788);
        lensTreasureHuntNfts[5] = ITokenERC721(0x2DA3F14E9cA3b51F29bc31D6aeD5B33B1708AEeE);
        for (uint i = 0; i < 5; i++) {
            treasureRecipients[i] = address(0);
        }
        lensTreasureHuntNftIdZerosLeft = 5;
    }

    function setAttestor(address phatAttestor) public {
        _grantRole(PhatRollupAnchor.ATTESTOR_ROLE, phatAttestor);
    }

    function setDigCost(uint256 _digCost) public onlyOwner {
        digCost = _digCost;
    }

    function setLensTreasureHuntNftAddress(uint _index, ITokenERC721 _nftAddress) public onlyOwner {
        lensTreasureHuntNfts[_index] = _nftAddress;
        emit SetLensTreasureHuntNftAddress(_index, _nftAddress);
    }

    function setLensTreasureHuntNftURI(uint _index, string memory _lensTreasureHuntNftsURI) public onlyOwner {
        _lensTreasureHuntNftsURIs[_index] = _lensTreasureHuntNftsURI;
    }

    function dig(string calldata profileId) public payable nonReentrant {
        require(msg.value >= digCost, "Sent MATIC is below the minimum required");
        bytes memory bytesProfileId = bytes(profileId);
        require(bytesProfileId.length > 2, "Lens Profile ID invalid");
        require(bytesProfileId[0] == "0" && bytesProfileId[1] == "x", "Lens Profile ID invalid");
        address sender = msg.sender;
        uint id = nextRequest;
        uint256 _ownersCut = msg.value / 2;
        if (_ownersCut > 0) {
            ownersCut += _ownersCut;
        }
        requests[id] = profileId;
        requestsByUsers[id] = sender;
        _pushMessage(abi.encode(id, profileId));
        emit NewDigRequest(id, profileId);
        nextRequest += 1;
    }

    function _onMessageReceived(bytes calldata action) internal override {
        require(action.length == 32 * 3, "cannot parse action");
        (uint respType, uint id, uint256 data) = abi.decode(
            action,
            (uint, uint, uint256)
        );
        if (respType == TYPE_RESPONSE) {
            ITokenERC721 lensTreasureHuntNftAddress = lensTreasureHuntNfts[id];
            address requester = requestsByUsers[id];
            try lensTreasureHuntNftAddress.mintTo(requester, _lensTreasureHuntNftsURIs[data]) returns (uint256 nftId) {
                if (nftId == 0) {
                    treasureRecipients[data - 1] = requester;
                    digCost += (1 ether/10_000);
                    lensTreasureHuntNftIdZerosLeft -= 1;
                    emit NewTreasureRecipient(requester);
                    emit DigCostIncrease(digCost);
                }
                emit ResponseReceived(id, requests[id], data);
                emit MintSucceeded(nftId);
                delete requests[id];
                delete requestsByUsers[id];
            } catch Error(string memory error) {
                emit ErrorMintFail(error);
                delete requests[id];
                delete requestsByUsers[id];
            }
        } else if (respType == TYPE_ERROR) {
            delete requests[id];
        }
    }

    function rewardTreasureRecipients() public {
        require(lensTreasureHuntNftIdZerosLeft < 1, "Not all treasure has been found! Keep digging!");
        uint256 split = address(this).balance / 5;
        for (uint i = 0; i < 5; i++) {
            payable(treasureRecipients[i]).transfer(split);
        }
        emit TreasureRecipientsRewarded(split);
        emit TreasureHuntOfficiallyEnded();
        digCost = 0;
    }

    function withdrawOwnersCut() public onlyOwner {
        require(ownersCut > 0, "Owner's cut looks empty mate...");
        payable(msg.sender).transfer(ownersCut);
        ownersCut = 0;
    }
}
