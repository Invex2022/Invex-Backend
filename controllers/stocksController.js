const pool = require("../db");

class stocks {
  static async buyStocks(req, res) {
    try {
      const {
        ticker_name,
        company_name,
        number_of_stocks,
        unit_price,
        sector,
      } = req.body;
      const { id } = req.params;

      let userBalance = await pool.query(
        "SELECT total_amount FROM users WHERE id = $1",
        [id]
      );
      let balance = userBalance.rows[0].total_amount;
      if (unit_price * number_of_stocks > balance) {
        return res.status(400).json({ message: "Not enough fund!" });
      }

      // check if company_name already exists in the stocks table
      const existingStock = await pool.query(
        "SELECT * FROM stocks WHERE user_id = $1 AND company_name = $2",
        [id, company_name]
      );

      // if it exists, update the number_of_stocks and unit_price
      if (existingStock.rows.length > 0) {
        const currentStock = existingStock.rows[0];
        const newNumberOfStocks =
          currentStock.number_of_stocks + number_of_stocks;
        const newUnitPrice = (currentStock.unit_price + unit_price) / 2;
        await pool.query(
          "UPDATE stocks SET number_of_stocks = $1, unit_price = $2 WHERE id= $3",
          [newNumberOfStocks, newUnitPrice, currentStock.id]
        );
      } else {
        // if it doesn't exist, insert a new record
        await pool.query(
          "INSERT INTO stocks (user_id, ticker_name, company_name, number_of_stocks, unit_price, sector) VALUES ($1, $2, $3, $4, $5, $6)",
          [id, ticker_name, company_name, number_of_stocks, unit_price, sector]
        );
      }

      const stockbalance = balance;
      const updatePrice = stockbalance - unit_price * number_of_stocks;
      await pool.query("UPDATE users SET total_amount = $1 WHERE id = $2; ", [
        updatePrice,
        id,
      ]);
      return res.json({
        message: "You have made purchased",
        ticker_name,
        company_name,
        number_of_stocks,
        unit_price,
        sector,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async sellStocks(req, res) {
    try {
      const {
        ticker_name,
        company_name,
        number_of_stocks,
        unit_price,
        sector,
      } = req.body;
      const { id } = req.params;

      let userStocks = await pool.query(
        "SELECT * FROM stocks WHERE user_id = $1 AND company_name = $2",
        [id, company_name]
      );
      if (userStocks.rows.length === 0) {
        return res.status(400).json({ message: "You do not own this stock" });
      }

      let userStock = userStocks.rows[0];
      if (number_of_stocks > userStock.number_of_stocks) {
        return res
          .status(400)
          .json({ message: "You do not have that many stocks to sell!" });
      }

      if (unit_price > userStock.unit_price) {
        return res
          .status(400)
          .json({
            message:
              "You are selling your stocks at a higher price than what you bought",
          });
      }

      let userBalance = await pool.query(
        "SELECT total_amount FROM users WHERE id = $1",
        [id]
      );
      let balance = userBalance.rows[0].total_amount;
      const newNumberOfStocks = userStock.number_of_stocks - number_of_stocks;
      if (newNumberOfStocks === 0) {
        await pool.query("DELETE FROM stocks WHERE id = $1", [userStock.id]);
      } else {
        await pool.query(
          "UPDATE stocks SET number_of_stocks = $1 WHERE id = $2;",
          [newNumberOfStocks, userStock.id]
        );
      }
      const updatePrice = balance + unit_price * number_of_stocks;
      await pool.query("UPDATE users SET total_amount = $1 WHERE id = $2; ", [
        updatePrice,
        id,
      ]);
      return res.json({
        message: "You have successfully sold your stock.",
        ticker_name,
        company_name,
        number_of_stocks,
        unit_price,
        sector,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = stocks;
