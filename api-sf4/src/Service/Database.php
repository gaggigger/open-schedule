<?php
namespace App\Service;


use App\Interfaces\DatabaseInterface;

class Database implements DatabaseInterface
{
    private $connection;

    public function __construct() {
        $this->connect();
    }

    /**
     *
     */
    public function connect(): void {
        [
            'scheme' => $scheme,
            'host' => $host,
            'port' => $port,
            'path' => $path,
            'user' => $user,
            'pass' => $pass
        ] = parse_url(getenv('DATABASE_URL'));
        $path = ltrim($path, "/");
        $this->connection = new \PDO("{$scheme}:host={$host};port={$port};dbname={$path}", $user, $pass);
    }

    /**
     * @param string $sql
     * @param array $parameters
     * @return bool
     */
    public function query(string $sql, array $parameters = []): bool
    {
        $statement = $this->connection->prepare($sql);
        foreach($parameters as $k => $v) {
            $statement->bindParam(":$k",$v);
        }
        return $statement->execute();
    }

    /**
     * @param string $sql
     * @param array $parameters
     * @return array
     */
    public function select(string $sql, array $parameters = []): iterable
    {
        $statement = $this->connection->prepare($sql);
        foreach($parameters as $k => $v) {
            $statement->bindParam(":$k",$v);
        }
        $statement->execute();
        return $statement->fetchAll(\PDO::FETCH_ASSOC);
    }
}