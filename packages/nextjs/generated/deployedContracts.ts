const contracts = {
  31337: [
    {
      chainId: "31337",
      name: "localhost",
      contracts: {
        PhatConsumerContract: {
          address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
          abi: [
            {
              inputs: [
                {
                  internalType: "address",
                  name: "phatAttestor",
                  type: "address",
                },
              ],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              inputs: [],
              name: "BadAttestor",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "kenLen",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "valueLen",
                  type: "uint256",
                },
              ],
              name: "BadCondLen",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "kenLen",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "valueLen",
                  type: "uint256",
                },
              ],
              name: "BadUpdateLen",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "uint8",
                  name: "actionId",
                  type: "uint8",
                },
              ],
              name: "CannotDecodeAction",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "bytes",
                  name: "cond",
                  type: "bytes",
                },
                {
                  internalType: "uint32",
                  name: "expected",
                  type: "uint32",
                },
                {
                  internalType: "uint32",
                  name: "actual",
                  type: "uint32",
                },
              ],
              name: "CondNotMet",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "bytes",
                  name: "data",
                  type: "bytes",
                },
              ],
              name: "Internal_toUint32Strict_outOfBounds",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "targetIdx",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "tailIdx",
                  type: "uint256",
                },
              ],
              name: "InvalidPopTarget",
              type: "error",
            },
            {
              inputs: [],
              name: "MetaTxSignatureNotMatch",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "actual",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "currentNonce",
                  type: "uint256",
                },
              ],
              name: "NonceTooLow",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "uint8",
                  name: "actionId",
                  type: "uint8",
                },
              ],
              name: "UnsupportedAction",
              type: "error",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "reqId",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "string",
                  name: "pair",
                  type: "string",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "errno",
                  type: "uint256",
                },
              ],
              name: "ErrorReceived",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "MessageProcessedTo",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "idx",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "bytes",
                  name: "data",
                  type: "bytes",
                },
              ],
              name: "MessageQueued",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [],
              name: "MetaTxDecoded",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "previousOwner",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "OwnershipTransferred",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "reqId",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "string",
                  name: "pair",
                  type: "string",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "value",
                  type: "uint256",
                },
              ],
              name: "ResponseReceived",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "bytes32",
                  name: "role",
                  type: "bytes32",
                },
                {
                  indexed: true,
                  internalType: "bytes32",
                  name: "previousAdminRole",
                  type: "bytes32",
                },
                {
                  indexed: true,
                  internalType: "bytes32",
                  name: "newAdminRole",
                  type: "bytes32",
                },
              ],
              name: "RoleAdminChanged",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "bytes32",
                  name: "role",
                  type: "bytes32",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "sender",
                  type: "address",
                },
              ],
              name: "RoleGranted",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "bytes32",
                  name: "role",
                  type: "bytes32",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "sender",
                  type: "address",
                },
              ],
              name: "RoleRevoked",
              type: "event",
            },
            {
              inputs: [],
              name: "ATTESTOR_ROLE",
              outputs: [
                {
                  internalType: "bytes32",
                  name: "",
                  type: "bytes32",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "DEFAULT_ADMIN_ROLE",
              outputs: [
                {
                  internalType: "bytes32",
                  name: "",
                  type: "bytes32",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "role",
                  type: "bytes32",
                },
              ],
              name: "getRoleAdmin",
              outputs: [
                {
                  internalType: "bytes32",
                  name: "",
                  type: "bytes32",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes",
                  name: "key",
                  type: "bytes",
                },
              ],
              name: "getStorage",
              outputs: [
                {
                  internalType: "bytes",
                  name: "",
                  type: "bytes",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "role",
                  type: "bytes32",
                },
                {
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
              ],
              name: "grantRole",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "role",
                  type: "bytes32",
                },
                {
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
              ],
              name: "hasRole",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes",
                  name: "malformedData",
                  type: "bytes",
                },
              ],
              name: "malformedRequest",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
              ],
              name: "metaTxGetNonce",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  internalType: "bytes",
                  name: "data",
                  type: "bytes",
                },
              ],
              name: "metaTxPrepare",
              outputs: [
                {
                  components: [
                    {
                      internalType: "address",
                      name: "from",
                      type: "address",
                    },
                    {
                      internalType: "uint256",
                      name: "nonce",
                      type: "uint256",
                    },
                    {
                      internalType: "bytes",
                      name: "data",
                      type: "bytes",
                    },
                  ],
                  internalType: "struct MetaTxReceiver.ForwardRequest",
                  name: "",
                  type: "tuple",
                },
                {
                  internalType: "bytes32",
                  name: "",
                  type: "bytes32",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  internalType: "bytes",
                  name: "data",
                  type: "bytes",
                },
                {
                  internalType: "uint256",
                  name: "nonce",
                  type: "uint256",
                },
              ],
              name: "metaTxPrepareWithNonce",
              outputs: [
                {
                  components: [
                    {
                      internalType: "address",
                      name: "from",
                      type: "address",
                    },
                    {
                      internalType: "uint256",
                      name: "nonce",
                      type: "uint256",
                    },
                    {
                      internalType: "bytes",
                      name: "data",
                      type: "bytes",
                    },
                  ],
                  internalType: "struct MetaTxReceiver.ForwardRequest",
                  name: "",
                  type: "tuple",
                },
                {
                  internalType: "bytes32",
                  name: "",
                  type: "bytes32",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  components: [
                    {
                      internalType: "address",
                      name: "from",
                      type: "address",
                    },
                    {
                      internalType: "uint256",
                      name: "nonce",
                      type: "uint256",
                    },
                    {
                      internalType: "bytes",
                      name: "data",
                      type: "bytes",
                    },
                  ],
                  internalType: "struct MetaTxReceiver.ForwardRequest",
                  name: "req",
                  type: "tuple",
                },
                {
                  internalType: "bytes",
                  name: "signature",
                  type: "bytes",
                },
              ],
              name: "metaTxRollupU256CondEq",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  components: [
                    {
                      internalType: "address",
                      name: "from",
                      type: "address",
                    },
                    {
                      internalType: "uint256",
                      name: "nonce",
                      type: "uint256",
                    },
                    {
                      internalType: "bytes",
                      name: "data",
                      type: "bytes",
                    },
                  ],
                  internalType: "struct MetaTxReceiver.ForwardRequest",
                  name: "req",
                  type: "tuple",
                },
                {
                  internalType: "bytes",
                  name: "signature",
                  type: "bytes",
                },
              ],
              name: "metaTxVerify",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "owner",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes",
                  name: "key",
                  type: "bytes",
                },
              ],
              name: "queueGetBytes",
              outputs: [
                {
                  internalType: "bytes",
                  name: "",
                  type: "bytes",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "queueGetPrefix",
              outputs: [
                {
                  internalType: "bytes",
                  name: "",
                  type: "bytes",
                },
              ],
              stateMutability: "pure",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes",
                  name: "key",
                  type: "bytes",
                },
              ],
              name: "queueGetUint",
              outputs: [
                {
                  internalType: "uint32",
                  name: "",
                  type: "uint32",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "renounceOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "role",
                  type: "bytes32",
                },
                {
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
              ],
              name: "renounceRole",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "string",
                  name: "profileId",
                  type: "string",
                },
              ],
              name: "request",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "role",
                  type: "bytes32",
                },
                {
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
              ],
              name: "revokeRole",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes[]",
                  name: "condKeys",
                  type: "bytes[]",
                },
                {
                  internalType: "bytes[]",
                  name: "condValues",
                  type: "bytes[]",
                },
                {
                  internalType: "bytes[]",
                  name: "updateKeys",
                  type: "bytes[]",
                },
                {
                  internalType: "bytes[]",
                  name: "updateValues",
                  type: "bytes[]",
                },
                {
                  internalType: "bytes[]",
                  name: "actions",
                  type: "bytes[]",
                },
              ],
              name: "rollupU256CondEq",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "phatAttestor",
                  type: "address",
                },
              ],
              name: "setAttestor",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes4",
                  name: "interfaceId",
                  type: "bytes4",
                },
              ],
              name: "supportsInterface",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes",
                  name: "_bytes",
                  type: "bytes",
                },
              ],
              name: "toUint32Strict",
              outputs: [
                {
                  internalType: "uint32",
                  name: "",
                  type: "uint32",
                },
              ],
              stateMutability: "pure",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "transferOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
          ],
        },
      },
    },
  ],
} as const;

export default contracts;
