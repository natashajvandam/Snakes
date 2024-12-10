// Multiplayer networking module
class MultiplayerManager {
    constructor(gameInstance) {
        this.gameInstance = gameInstance;
        this.socket = null;
        this.playerID = null;
        this.isHost = false;
    }

    initializeConnection(isHost = false) {
        this.isHost = isHost;
        // Use environment variable or default WebSocket server
        const serverUrl = process.env.WEBSOCKET_SERVER || 'ws://localhost:8080';
        
        this.socket = new WebSocket(serverUrl);

        this.socket.onopen = () => {
            console.log('Connected to multiplayer server');
            if (isHost) {
                this.socket.send(JSON.stringify({ type: 'CREATE_ROOM' }));
            } else {
                this.socket.send(JSON.stringify({ type: 'JOIN_ROOM' }));
            }
        };

        this.socket.onmessage = this.handleServerMessage.bind(this);
        this.socket.onclose = this.handleDisconnect.bind(this);
    }

    handleServerMessage(event) {
        const data = JSON.parse(event.data);

        switch(data.type) {
            case 'ROOM_CREATED':
                this.playerID = data.playerID;
                console.log(`Room created. Your Player ID: ${this.playerID}`);
                break;
            
            case 'ROOM_JOINED':
                this.playerID = data.playerID;
                console.log(`Joined room. Your Player ID: ${this.playerID}`);
                break;
            
            case 'GAME_STATE':
                this.syncGameState(data.gameState);
                break;
            
            case 'PLAYER_MOVE':
                this.handleRemotePlayerMove(data.playerID, data.direction);
                break;
        }
    }

    syncGameState(gameState) {
        // Synchronize game state across network
        this.gameInstance.setState(gameState);
    }

    handleRemotePlayerMove(playerID, direction) {
        if (playerID !== this.playerID) {
            // Update the other player's snake movement
            this.gameInstance.updateRemotePlayerSnake(playerID, direction);
        }
    }

    sendGameState() {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify({
                type: 'GAME_STATE',
                gameState: this.gameInstance.getState(),
                playerID: this.playerID
            }));
        }
    }

    sendPlayerMove(direction) {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify({
                type: 'PLAYER_MOVE',
                direction: direction,
                playerID: this.playerID
            }));
        }
    }

    handleDisconnect() {
        console.log('Disconnected from multiplayer server');
        // Implement reconnection logic or game end
    }
}

export default MultiplayerManager;