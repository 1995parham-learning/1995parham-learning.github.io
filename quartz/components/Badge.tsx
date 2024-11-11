import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const Badge: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
  return fileData.frontmatter?.repo ? <a href="https://github.com/1995parham-learning/{}"><img alt="Static Badge" src="https://img.shields.io/badge/Github-1995parham_learning-orange?style=for-the-badge&logo=github" /></a> : null
}

export default (() => Badge) satisfies QuartzComponentConstructor
