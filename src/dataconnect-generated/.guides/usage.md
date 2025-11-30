# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.


### Angular

The generated SDK creates injectable wrapper functions.

Here's an example:
```
import { injectCreateNewMessage, injectGetPublicPortfolios, injectUpdateProjectDescription, injectListSkillsForUser } from '@dataconnect/generated/angular';

@Component({
  selector: 'my-component',
  ...
})
class MyComponent {
  // The types of these injectors are available in angular/index.d.ts
  private readonly CreateNewMessageOperation = injectCreateNewMessage(createNewMessageVars);
  private readonly GetPublicPortfoliosOperation = injectGetPublicPortfolios();
  private readonly UpdateProjectDescriptionOperation = injectUpdateProjectDescription(updateProjectDescriptionVars);
  private readonly ListSkillsForUserOperation = injectListSkillsForUser(listSkillsForUserVars);
  }
```

Each operation is a wrapper function around Tanstack Query Angular.

Here's an example:
```ts
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'simple-example',
  template: `
    @if (movies.isPending()) {
      Loading...
    }
    @if (movies.error()) {
      An error has occurred: {{ movies.error().message }}
    }
    @if (movies.data(); as data) {
      @for (movie of data.movies ; track
        movie.id) {
      <h1>{{ movie.title }}</h1>
      <p>{{ movie.synopsis }}</p>
      }
    }
  `
})
export class SimpleExampleComponent {
  http = inject(HttpClient)

  movies = injectListMovies();
}
```




## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { createNewMessage, getPublicPortfolios, updateProjectDescription, listSkillsForUser } from '@dataconnect/generated';


// Operation CreateNewMessage:  For variables, look at type CreateNewMessageVars in ../index.d.ts
const { data } = await CreateNewMessage(dataConnect, createNewMessageVars);

// Operation GetPublicPortfolios: 
const { data } = await GetPublicPortfolios(dataConnect);

// Operation UpdateProjectDescription:  For variables, look at type UpdateProjectDescriptionVars in ../index.d.ts
const { data } = await UpdateProjectDescription(dataConnect, updateProjectDescriptionVars);

// Operation ListSkillsForUser:  For variables, look at type ListSkillsForUserVars in ../index.d.ts
const { data } = await ListSkillsForUser(dataConnect, listSkillsForUserVars);


```