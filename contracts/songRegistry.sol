// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract SongRegistry {
    struct Song {
        string title;
        address owner;
        string url;
        uint256 price;
    }

    Song[] public songs;

    // Simple constructor
    constructor() {}

    function registerSong(string memory _title, string memory _url, uint256 _price) public {
        songs.push(Song(_title, msg.sender, _url, _price));
    }

    function getNumberOfSongs() public view returns (uint256) {
        return songs.length;
    }
}