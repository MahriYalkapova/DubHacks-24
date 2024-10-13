from faker import Faker
import random
import json

fake = Faker()

# Define the topics and resource types users may prefer
topics = ["Python", "Machine Learning", "Data Science", "AI", "Web Development"]
resource_types = ["videos", "courses", "books"]

def generate_user_data(num_users):
    users = []
    
    for i in range(num_users):
        user = {
            "user_id": f"user{i+1:03}",
            "username": fake.user_name(),
            "email": fake.email(),
            "preferred_topics": random.sample(topics, random.randint(1, 3)),  # Choose 1 to 3 topics
            "preferred_resource_type": random.choice(resource_types),
            "time_commitment": random.choice(["daily", "weekly", "monthly"]),
            "courses_completed": [f"course{random.randint(1, 10)}" for _ in range(random.randint(0, 5))],
            "videos_watched": [f"video{random.randint(1, 50)}" for _ in range(random.randint(0, 10))],
            "feedback": {f"video{random.randint(1, 50)}": random.choice([1, 2, 3, 4, 5]) for _ in range(random.randint(1, 5))}
        }
        users.append(user)
    
    return users

# Generate 500 users
user_data = generate_user_data(500)

# Save to JSON file
with open("user_data.json", "w") as f:
    json.dump(user_data, f, indent=4)

print("500 users generated and saved to user_data.json")
