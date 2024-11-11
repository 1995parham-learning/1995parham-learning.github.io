import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const Badge: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
  if (fileData.frontmatter?.repo && typeof fileData.frontmatter.repo === "string") {
    const repo = new URL(fileData.frontmatter.repo)

    const org = repo.pathname.split("/")[1].replaceAll("-", "_")

    return (
      <a target="_blank" href={"https://github.com/" + fileData.frontmatter.repo}>
        <img
          alt="Static Badge"
          src={`https://img.shields.io/badge/Github-${org}-orange?style=for-the-badge&logo=github`}
        />
      </a>
    )
  }

  return null
}

export default (() => Badge) satisfies QuartzComponentConstructor
