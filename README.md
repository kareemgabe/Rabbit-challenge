Environment Setup:
Clone the repository.

Run yarn install to install the necessary dependencies.

Connect to your local PostgreSQL database.
Run yarn prisma:generate to generate Prisma client.
Run yarn migrate:dev to apply database migrations.
Run yarn seed to seed the database with initial data.
Start the development server with yarn run start:dev.
Top 10 Most Frequently Ordered Products API
This API provides a list of the top 10 most frequently ordered products in a specific area. By querying the API with an area parameter, users can retrieve a sorted list of products based on the total number of orders in that area. Each product in the response includes details such as its unique ID, name, category, and the number of orders it has received. This data helps businesses with inventory management, marketing strategies, and product recommendations, enabling data-driven decision-making.

.env:
   DATABASE_URL=// Use your local database here
   PUSHOVER_USER_KEY=u6jjng5y1sfp1yrtqrgvpixp4rv3k8
   PUSHOVER_API_TOKEN=a1nthoomn4ywhi7847sfeyn465kfny


Test the API at:
http://localhost:8080/order/top-products?area=Giza

Optimizing a Poorly Implemented List Products API:
When building scalable applications, especially those involving databases and large datasets, performance optimization is key. Here, we compare two approaches for fetching products from the database with filters such as categories, pagination, and sorting. We’ll highlight the key differences between the two and explain why the second implementation is better in terms of efficiency, scalability, and performance.

First Implementation: Multiple Queries for Each Category
typescript
Copy code
async getAllProducts(filters: GetAllProductsDTO): Promise<ProductDTO[]> {
  if (filters.categories && filters.categories.length) {
    const products = [];
    for (let i = 0; i < filters.categories.length; i++) {
      products.push(
        await this.prismaService.product.findFirst({
          where: { category: filters.categories[i] },
        }),
      );
    }
  }
  return this.prismaService.product.findMany();
}
Key Features:

Multiple Database Queries: The function loops over each category in the filters.categories array, executing a separate findFirst query for each category.
Final findMany Query: After fetching individual categories, it executes another query to retrieve all products without applying the category filters.
High Database Load: Each loop iteration results in a database query, meaning a large number of categories leads to a significant load on the database, reducing efficiency.
Time Complexity:
O(n * m + p)

n: Number of categories in filters.categories.
m: Total number of records in the database.
p: Number of products returned by findMany.
This approach is inefficient because it involves looping over categories and performing separate queries for each one, which increases the overall load on the database. Furthermore, the final findMany fetches all products without filtering, resulting in unnecessary data retrieval.

Second Implementation: Single Optimized Query
typescript
Copy code
async getAllProducts(filters: any): Promise<ProductDTO[]> {
  const { categories, page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = filters;

  const skip = (page - 1) * limit;

  return this.productsRepository.findAll({
    categories,
    skip,
    take: limit,
    orderBy: { [sortBy]: sortOrder },
  });
}
Key Features:

Single Query: This implementation uses a single optimized query (findAll) that applies all filters (categories, pagination, sorting) in one go, reducing the number of database queries.
Pagination: The skip and take parameters efficiently handle pagination, fetching only the required records, making it suitable for large datasets.
Sorting: Sorting is applied directly in the query, ensuring results are returned in the desired order without requiring additional processing.
Time Complexity:
O(log(m) + n + limit) (assuming proper indexes)

m: Total number of records in the database.
n: Number of records matching the category filter.
limit: Number of records to fetch for pagination.
This implementation is far more efficient because it executes a single query to handle all filtering, sorting, and pagination. The number of queries is reduced, and only relevant data is processed, leading to a more efficient system.

Why the Second Implementation is Better
Reduced Database Load:

First Implementation: Executes multiple queries (one per category), leading to higher database load, especially if the categories array is large.
Second Implementation: Uses a single query to fetch the data, drastically reducing the number of database calls and load.
Improved Query Efficiency:

First Implementation: Multiple queries fetch unnecessary data, leading to inefficiencies.
Second Implementation: Applies all filters (categories, pagination, sorting) in a single query, ensuring that only the necessary data is retrieved.
Scalability:

First Implementation: The database load increases as the number of categories grows, making it less scalable.
Second Implementation: Pagination allows data to be fetched in smaller chunks, ensuring better scalability as the number of users and records increases.
Better Use of Indexes:

First Implementation: Query performance can be suboptimal due to the absence of filtering in the final findMany query.
Second Implementation: By applying filtering, sorting, and pagination in one query, the database can leverage indexes on relevant columns (e.g., category, sortBy), improving query performance.
Code Simplicity and Maintainability:

First Implementation: The code is more complex and less maintainable due to the multiple queries and unnecessary operations.
Second Implementation: More concise and easier to maintain, with all logic consolidated into a single query.
Additional Performance Enhancement: Caching
To further optimize the API's performance, caching can be implemented. Caching frequently queried data reduces the need for repeated database calls, especially for static data or results that change infrequently.

Potential Caching Strategies:

Product Listings: Cache product listings for category filters or specific queries to prevent redundant database queries.
Frequently Accessed Categories: Cache results of category-based filters for a certain time (e.g., 1 hour) to reduce repeated load.
Using caching in combination with the second implementation can significantly improve both response time and scalability by reducing unnecessary database queries during peak load times



