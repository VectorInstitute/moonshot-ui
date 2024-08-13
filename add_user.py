"""Script to add user accounts for the MLHC hackathon and save them to a CSV file."""

import asyncio
import csv
import secrets
from typing import Optional

import bcrypt
from prisma import Prisma
from prisma.models import User

async def add_user(username: str, password: str) -> Optional[User]:
    """
    Add a new user to the database with the given username and password.

    Parameters
    ----------
    username : str
        The username of the new user.
    password : str
        The password for the new user (will be hashed before storage).

    Returns
    -------
    Optional[User]
        The created User object if successful, None otherwise.
    """
    db = Prisma()
    await db.connect()

    try:
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        
        user_data = {
            'username': username,
            'password': hashed_password.decode('utf-8'),
        }
        print(f"Attempting to create user with username: {username}")
        
        user = await db.user.create(data=user_data)
        print(f"User created successfully with ID: {user.id}")
        return user
    except Exception as e:
        print(f"Error creating user: {str(e)}")
        print(f"Error type: {type(e).__name__}")
        return None
    finally:
        await db.disconnect()

def generate_secure_password():
    """Generate a secure random password."""
    return secrets.token_urlsafe(16)

async def save_to_csv(user_data: list):
    """Save user data to a CSV file."""
    with open('user_accounts.csv', mode='w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(['Username', 'Password'])  # header
        writer.writerows(user_data)

async def main() -> None:
    """
    Main function to create 20 user accounts and save them to a CSV file.
    """
    user_data = []
    for i in range(1, 21):
        username = f"team_{i:02d}"
        password = generate_secure_password()
        user = await add_user(username, password)
        if user:
            user_data.append((username, password))
            print(f"User added successfully: {user.username}")
        else:
            print(f"Failed to add user: {username}")
    
    await save_to_csv(user_data)
    print("User accounts have been saved to user_accounts.csv")

if __name__ == "__main__":
    asyncio.run(main())