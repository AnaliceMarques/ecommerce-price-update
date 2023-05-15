import express from "express";
import multer from "multer";
import { Readable } from "stream";
import readline from "readline";
import { ProductUpload, ProductValidation } from "../models/Product";
import { db } from "../database/db";

const upload = multer();

export const ProductRouter = express.Router();

ProductRouter.post("/", upload.single("file"), async (req, res) => {
  try {
    const { file } = req;
    if (!file) {
      throw new Error("Selecione um arquivo");
    }

    const { buffer } = file;

    const readableFile = new Readable();
    readableFile.push(buffer);
    readableFile.push(null);

    const productsLine = readline.createInterface({
      input: readableFile,
    });

    const productsUpload: ProductUpload[] = [];
    const errors: string[] = [];

    for await (let line of productsLine) {
      const productLineSplit = line.split(",");

      productsUpload.push({
        productCode: Number(productLineSplit[0]),
        newPrice: Number(productLineSplit[1]),
        validationErrors: [],
      });
    }

    productsUpload.shift();

    const productsValidation: ProductValidation[] = [];

    for await (let productUpload of productsUpload) {
      if (productUpload.productCode === 0) {
        productUpload.validationErrors.push(
          "O código do produto deve ser informado"
        );
        errors.push(`${productUpload.validationErrors}`);

        productsValidation.push({
          productCode: productUpload.productCode,
          name: "não cadastrado",
          salesPrice: undefined,
          newPrice: productUpload.newPrice,
          validationErrors: productUpload.validationErrors,
        });
      } else {
        const [productDB] = await db
          .select()
          .from("products")
          .where({ code: productUpload.productCode });

        if (!productDB) {
          productUpload.validationErrors.push(
            "O código do produto não existe no banco de dados"
          );
          errors.push(`${productUpload.validationErrors}`);
        } else {
          if (productUpload.newPrice === 0) {
            productUpload.validationErrors.push(
              "O novo preço deve ser informado"
            );
            errors.push(`${productUpload.validationErrors}`);
          } else if (isNaN(productUpload.newPrice)) {
            productUpload.validationErrors.push(
              "O novo preço deve ser um número"
            );
            errors.push(`${productUpload.validationErrors}`);
          } else if (productUpload.newPrice <= productDB.cost_price) {
            productUpload.validationErrors.push(
              "O novo preço de venda tem que ser maior que o preço de custo"
            );
            errors.push(`${productUpload.validationErrors}`);
          } else if (productUpload.newPrice > 1.1 * productDB.sales_price) {
            productUpload.validationErrors.push(
              "O novo preço de venda não pode aumentar mais que 10% do preço de venda atual"
            );
            errors.push(`${productUpload.validationErrors}`);
          } else if (productUpload.newPrice < 0.9 * productDB.sales_price) {
            productUpload.validationErrors.push(
              "O novo preço de venda não pode diminuir mais que 10% do preço de venda atual"
            );
            errors.push(`${productUpload.validationErrors}`);
          }
        }
        productsValidation.push({
          productCode: productUpload.productCode,
          name: productDB.name,
          salesPrice: productDB.sales_price,
          newPrice: productUpload.newPrice,
          validationErrors: productUpload.validationErrors,
        });
      }
    }

    if (errors.length > 0) {
      return res.status(400).send(productsValidation);
    }

    return res.status(200).send(productsValidation);
  } catch (error) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

ProductRouter.put("/", upload.single("file"), async (req, res) => {
  try {
    const { file } = req;
    if (!file) {
      throw new Error("Selecione um arquivo");
    }

    const { buffer } = file;

    const readableFile = new Readable();
    readableFile.push(buffer);
    readableFile.push(null);

    const productsLine = readline.createInterface({
      input: readableFile,
    });

    const productsUpload: ProductUpload[] = [];
    const errors: string[] = [];

    for await (let line of productsLine) {
      const productLineSplit = line.split(",");

      productsUpload.push({
        productCode: Number(productLineSplit[0]),
        newPrice: Number(productLineSplit[1]),
        validationErrors: [],
      });
    }

    productsUpload.shift();

    const productsValidation: ProductValidation[] = [];

    for await (let productUpload of productsUpload) {
      if (productUpload.productCode === 0) {
        productUpload.validationErrors.push(
          "O código do produto deve ser informado"
        );
        errors.push(`${productUpload.validationErrors}`);

        productsValidation.push({
          productCode: productUpload.productCode,
          name: "não cadastrado",
          salesPrice: undefined,
          newPrice: productUpload.newPrice,
          validationErrors: productUpload.validationErrors,
        });
      } else {
        const [productDB] = await db
          .select()
          .from("products")
          .where({ code: productUpload.productCode });

        if (!productDB) {
          productUpload.validationErrors.push(
            "O código do produto não existe no banco de dados"
          );
          errors.push(`${productUpload.validationErrors}`);
        } else {
          if (productUpload.newPrice === 0) {
            productUpload.validationErrors.push(
              "O novo preço deve ser informado"
            );
            errors.push(`${productUpload.validationErrors}`);
          } else if (isNaN(productUpload.newPrice)) {
            productUpload.validationErrors.push(
              "O novo preço deve ser um número"
            );
            errors.push(`${productUpload.validationErrors}`);
          } else if (productUpload.newPrice <= productDB.cost_price) {
            productUpload.validationErrors.push(
              "O novo preço de venda tem que ser maior que o preço de custo"
            );
            errors.push(`${productUpload.validationErrors}`);
          } else if (productUpload.newPrice > 1.1 * productDB.sales_price) {
            productUpload.validationErrors.push(
              "O novo preço de venda não pode aumentar mais que 10% do preço de venda atual"
            );
            errors.push(`${productUpload.validationErrors}`);
          } else if (productUpload.newPrice < 0.9 * productDB.sales_price) {
            productUpload.validationErrors.push(
              "O novo preço de venda não pode diminuir mais que 10% do preço de venda atual"
            );
            errors.push(`${productUpload.validationErrors}`);
          }
        }
        productsValidation.push({
          productCode: productUpload.productCode,
          name: productDB.name,
          salesPrice: productDB.sales_price,
          newPrice: productUpload.newPrice,
          validationErrors: productUpload.validationErrors,
        });
      }
    }

    if (errors.length > 0) {
      return res.status(400).send("Verificar as observações");
    } else {
      for await (let productUpdate of productsValidation) {
        db("products")
          .update({ sales_price: productUpdate.newPrice })
          .where({ code: productUpdate.productCode });

        // const [productPack] = await db.select().from("packs").where({product_id: productUpdate.productCode})
      }
    }

    return res.status(200).send("Preços atualizado com sucesso");
  } catch (error) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});
