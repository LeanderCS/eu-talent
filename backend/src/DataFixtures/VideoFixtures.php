<?php

namespace App\DataFixtures;

use App\Entity\Video;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;

class VideoFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        $users = $manager->getRepository(User::class)->findAll();

        if (empty($users)) {
            throw new \Exception("Aucun utilisateur trouvé. Assurez-vous que UserFixtures est bien chargé.");
        }

        $videosData = [
            [
                'country' => 'Germany',
                'videoUrl' => 'https://www.example.com/video1.mp4',
                'description' => 'Une belle vidéo de l’Allemagne.',
            ],
            [
                'country' => 'France',
                'videoUrl' => 'https://www.example.com/video2.mp4',
                'description' => 'Une superbe vidéo de la France.',
            ],
            [
                'country' => 'Japan',
                'videoUrl' => 'https://www.example.com/video3.mp4',
                'description' => 'Exploration du Japon.',
            ],
        ];

        foreach ($videosData as $videoData) {
            $video = new Video();
            $video->setCountry($videoData['country']);
            $video->setVideoUrl($videoData['videoUrl']);
            $video->setDescription($videoData['description']);
            $video->setCreatedAt(new \DateTimeImmutable());

            $video->setUser($users[array_rand($users)]);

            $manager->persist($video);
        }

        $manager->flush();
    }

    public function getDependencies(): array
    {
        return [
            UserFixtures::class,
        ];
    }
}
