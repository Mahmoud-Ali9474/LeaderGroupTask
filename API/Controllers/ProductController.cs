using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using API.Data;
using API.Dtos;
using API.Models;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IProductRepository _productRepository;
        private readonly IUnitOfWork _unitOfWork;

        public ProductController(IMapper mapper, IProductRepository repository, IUnitOfWork unitOfWork)
        {
            this._unitOfWork = unitOfWork;
            this._productRepository = repository;
            this._mapper = mapper;
        }
        [HttpGet("getall")]
        public async Task<IActionResult> GetProducts([FromQuery] ProductSeachFacade search)
        {
            return Ok((await _productRepository.GetAllProducts(search)).Select(p => _mapper.Map<ProductDto>(p)));
        }

        [Authorize(Roles = "manager,admin")]
        [HttpPost]
        public async Task<IActionResult> CreateProduct(SaveProductDto saveProductDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var product = _mapper.Map<SaveProductDto, Product>(saveProductDto);
            product.AddedDate = DateTime.Now.Date;

            await _productRepository.Add(product);
            await _unitOfWork.CompleteAsync();

            product = await _productRepository.GetProduct(product.Id);

            var result = _mapper.Map<Product, ProductDto>(product);

            return Ok(result);
        }
        [Authorize(Roles = "manager,admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(int id, [FromBody] SaveProductDto saveProductDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var product = await _productRepository.GetProduct(id);

            if (product == null)
                return NotFound();

            _mapper.Map<SaveProductDto, Product>(saveProductDto, product);
            await _productRepository.Update(product);
            await _unitOfWork.CompleteAsync();

            product = await _productRepository.GetProduct(product.Id);
            var result = _mapper.Map<Product, ProductDto>(product);

            return Ok(result);
        }
        [Authorize(Roles = "manager,admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _productRepository.GetProduct(id, includeRelated: false);

            if (product == null)
                return NotFound();

            _productRepository.Remove(product);
            await _unitOfWork.CompleteAsync();

            return Ok(id);
        }
        [Authorize(Roles = "manager,admin")]
        [HttpDelete("deletemany")]
        public async Task<IActionResult> DeleteProduct(List<int> ids)
        {

            _productRepository.DeleteMany(ids);
            await _unitOfWork.CompleteAsync();

            return Ok(ids);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProduct(int id)
        {
            var product = await _productRepository.GetProduct(id);

            if (product == null)
                return NotFound();

            var productDto = _mapper.Map<Product, ProductDto>(product);

            return Ok(productDto);
        }
    }
}