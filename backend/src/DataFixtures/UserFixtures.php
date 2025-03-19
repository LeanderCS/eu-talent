<?php
namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;


class UserFixtures extends Fixture
{
private UserPasswordHasherInterface $passwordHasher;

public function __construct(UserPasswordHasherInterface $passwordHasher)
{
$this->passwordHasher = $passwordHasher;
}

public function load(ObjectManager $manager): void
{


// Données fictives pour les utilisateurs
    $usersData = [
        [
            'username' => 'Leander',
            'password' => '123456',
            'country' => 'Germany',
            'profilePicture' => 'profile2.jpg',
        ],
        [
            'username' => 'Oscar',
            'password' => '123456',
            'country' => 'France',
            'profilePicture' => 'profile1.jpg',
        ],

];

foreach ($usersData as $userData) {
$user = new User();
$user->setUsername($userData['username']);
$user->setCountry($userData['country']);
$user->setProfilePicture($userData['profilePicture']);
$user->setCreatedAt(new \DateTimeImmutable());


$hashedPassword = $this->passwordHasher->hashPassword($user, $userData['password']);
$user->setPassword($hashedPassword);


$manager->persist($user);
}

// Saving new users in database
$manager->flush();
}
}
