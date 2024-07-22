# @formzk

## Introduction

In the modern development landscape, building flexible and reusable form components is crucial for creating scalable applications. `@formzk` was developed to meet this need by providing a headless form library that integrates seamlessly with react-hook-form. Designed to work across both web and mobile projects (React, Next.js, React Native), `@formzk` enables developers to create consistent, maintainable, and scalable form solutions.

## Vision

The vision of `@formzk` is to simplify form management in modern applications by offering a robust and flexible foundation. By decoupling form logic from presentation, developers can focus on building dynamic and responsive UIs without being bogged down by repetitive form setup tasks. This library aims to be the go-to solution for developers looking to create highly customizable and reusable form components, fostering better code organization and reusability.

---

## Available Packages

### @formzk/core

`@formzk/core` was born out of the necessity to overcome the limitations of existing form solutions that often tightly couple form logic with UI components. This coupling can lead to duplicated code and hinder the flexibility needed to adapt to different use cases. By leveraging the power of react-hook-form and introducing a headless architecture, @formzk/core allows developers to register and manage form components globally, ensuring consistency and reducing redundancy. This results in cleaner, more maintainable code and a more efficient development process.

Please refer to [documentation](./libs/core/README.md)

### @formzk/mui

`@formzk/mui` was created to bridge the gap between headless form management and Material-UI's rich component library. While @formzk/core provides the foundation for flexible form logic, developers often need to invest additional effort to integrate UI components. @formzk/mui addresses this by offering a set of ready-to-use, pre-configured Material-UI components that work seamlessly with the @formzk/core architecture. This reduces the overhead of setting up forms and ensures that developers can leverage the full potential of Material-UI with the powerful form handling capabilities of @formzk/core.

Please refer to [documentation](./libs/mui/README.md)

### @formzk/tamagui

upcoming

---

### Example

Check out examples of implementation in Next.js project.

| Example                            | Link                                                                                                |
| ---------------------------------- | --------------------------------------------------------------------------------------------------- |
| Setup Module Augmentation          | [Checkout](https://github.com/louiskhenghao/formzk/blob/main/apps/example/index.d.ts#L16)           |
| Usage of @formzk/core              | [Checkout](https://github.com/louiskhenghao/formzk/blob/main/apps/example/src/pages/index.tsx)      |
| Usage of @formzk/mui               | [Checkout](https://github.com/louiskhenghao/formzk/blob/main/apps/example/src/pages/mui.tsx)        |
| Usage of @formzk/mui (with config) | [Checkout](https://github.com/louiskhenghao/formzk/blob/main/apps/example/src/pages/mui-config.tsx) |
