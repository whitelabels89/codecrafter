import { users, gameStates, type User, type InsertUser, type GameState, type InsertGameState } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getGameState(userId: number): Promise<GameState | undefined>;
  createGameState(gameState: InsertGameState): Promise<GameState>;
  updateGameState(id: number, gameState: Partial<InsertGameState>): Promise<GameState | undefined>;
  deleteGameState(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private gameStates: Map<number, GameState>;
  private currentUserId: number;
  private currentGameStateId: number;

  constructor() {
    this.users = new Map();
    this.gameStates = new Map();
    this.currentUserId = 1;
    this.currentGameStateId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getGameState(userId: number): Promise<GameState | undefined> {
    return Array.from(this.gameStates.values()).find(
      (gameState) => gameState.userId === userId,
    );
  }

  async createGameState(insertGameState: InsertGameState): Promise<GameState> {
    const id = this.currentGameStateId++;
    const gameState: GameState = { ...insertGameState, id };
    this.gameStates.set(id, gameState);
    return gameState;
  }

  async updateGameState(id: number, updates: Partial<InsertGameState>): Promise<GameState | undefined> {
    const gameState = this.gameStates.get(id);
    if (!gameState) return undefined;
    
    const updatedGameState = { ...gameState, ...updates };
    this.gameStates.set(id, updatedGameState);
    return updatedGameState;
  }

  async deleteGameState(id: number): Promise<boolean> {
    return this.gameStates.delete(id);
  }
}

export const storage = new MemStorage();
