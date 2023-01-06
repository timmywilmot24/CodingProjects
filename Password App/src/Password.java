package src;

import java.io.*;  
import java.util.Scanner; 
import java.util.Map;
import java.util.HashMap;

public class Password
{

    public static File file = new File("src/accounts.csv");

    public static void main(String[] args)
    {
        String operation = "";
        String account = "";
        if (args[0] == null)
        {
            System.out.println("You need to add an operation. Try get, delete, add, or change.");
        }
        else
        {
            operation = args[0];
        }
        if (args[1] == null)
        {
            System.out.println("You need to add an account to search for.");
        }
        else 
        {
            account = args[1];
        }
        if (operation.equals("get"))
        {
            handleRetrieve(account);
        }
        else if (operation.equals("delete"))
        {
            handleDelete(account);
        }
        else if (operation.equals("add") || operation.equals("change"))
        {
            if (args[2] == null)
            {
                System.out.println("You need to add a username that you want to " + operation + ".");
            }
            else if (args[3] == null)
            {
                System.out.println("You need to add a password that you want to " + operation + ".");
            }
            else
            {
                if (operation.equals("add"))
                {
                    handleAdd(account, args[2], args[3]);
                }
                else
                {
                    handleChange(account, args[2], args[3]);
                }
            }
        }
        else
        {
            if (!operation.isEmpty())
            {
                System.out.println("You entered an invalid operation. Try get, delete, add, or change.");
            }
        }
        
    }

    public static Map<String, String> createMapFromFile(File file)
    {
        Map<String, String> map = new HashMap<>();
        try {
            Scanner s = new Scanner(file);
            s.useDelimiter(",");
            int i = 0;
            String key = "";
            String vals = "";
            while (s.hasNext())
            {
                String next = s.next();
                next = next.trim();
                if (i%3 == 0)
                {
                    key = next;
                }
                else if (i%3 == 1)
                {
                    vals = next;
                }
                else
                {
                    vals = vals + ";" + next;
                    map.put(key, vals);
                }
                i++;
            }
            s.close();
        } catch (FileNotFoundException e) {
            throw new RuntimeException("File with accounts not found", e);
        }
        return map;
    }

    public static void createFileFromMap(Map<String, String> map)
    {
        StringBuilder str = new StringBuilder();
        for (Map.Entry<String,String> entry : map.entrySet())
        {
            str.append(entry.getKey());
            String[] vals = entry.getValue().split(";");
            str.append(", " + vals[0] + ", " + vals[1] + ",\n");
        }

        try {
            File file = new File("src/accounts.csv");
            FileWriter fileWriter = new FileWriter(file);
            fileWriter.write(str.toString());
            fileWriter.flush();
            fileWriter.close();
        } 
        catch (IOException e) 
        {
            throw new RuntimeException("An error occurred.", e);
        }
    }

    public static void handleRetrieve(String account)
    {
        Map<String, String> map = createMapFromFile(file);
        if (map.containsKey(account))
        {
            String[] vals = map.get(account).split(";");
            System.out.println("We found your account. The username is " + vals[0] + " and the password is " + vals[1] + ".");
        }
        else 
        {
            System.out.println("No account found for the account " + account + ".");
        }
    }

    public static void handleDelete(String account)
    {
        Map<String, String> map = createMapFromFile(file);
        if (!map.containsKey(account))
        {
            System.out.println("Account " + account + " does not exist.");
        }
        else
        {
            map.remove(account);
            System.out.println("Account " + account + " successfully removed.");
        }
        createFileFromMap(map);
    }

    public static void handleAdd(String account, String username, String password)
    {
        Map<String, String> map = createMapFromFile(file);
        if (map.containsKey(account))
        {
            System.out.println("Cannot add account " + account + " since it already exists.");
        }
        else
        {
            map.put(account, username + ";" + password);
            System.out.println("Account " + account + " added successfully.");
        }
        createFileFromMap(map);
    }

    public static void handleChange(String account, String username, String password)
    {
        Map<String, String> map = createMapFromFile(file);
        if (!map.containsKey(account))
        {
            System.out.println("Cannot change account " + account + " since account doesn't currently exist.");
        }
        else
        {
            map.put(account, username + ";" + password);
            System.out.println("Account " + account + " added successfully with username " + username + " and password " + password + ".");
        }
        createFileFromMap(map);
    }
}
